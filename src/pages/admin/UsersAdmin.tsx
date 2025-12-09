import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Shield, Trash2, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor';
}

const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

const UsersAdmin = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'editor'>('editor');
  
  // Create user form state
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor'>('editor');
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = async () => {
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('user_roles').select('*'),
    ]);

    if (profilesRes.error) {
      toast.error('Failed to load users');
      console.error(profilesRes.error);
    } else {
      setProfiles(profilesRes.data || []);
    }

    if (!rolesRes.error) {
      setUserRoles(rolesRes.data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserRole = (userId: string): 'admin' | 'editor' | null => {
    const role = userRoles.find(r => r.user_id === userId);
    return role?.role || null;
  };

  const openAssignRoleDialog = (profile: Profile) => {
    setSelectedUser(profile);
    const currentRole = getUserRole(profile.id);
    setSelectedRole(currentRole || 'editor');
    setDialogOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = createUserSchema.safeParse({ 
      email: newEmail, 
      password: newPassword, 
      fullName: newFullName 
    });
    
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsCreating(true);
    
    try {
      // Call edge function to create user (admin only operation)
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: { 
          email: newEmail, 
          password: newPassword, 
          fullName: newFullName,
          role: newRole
        }
      });

      if (error) throw error;

      toast.success('User created successfully');
      setCreateDialogOpen(false);
      setNewEmail('');
      setNewPassword('');
      setNewFullName('');
      setNewRole('editor');
      fetchData();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    } finally {
      setIsCreating(false);
    }
  };

  const handleAssignRole = async () => {
    if (!selectedUser) return;

    const existingRole = userRoles.find(r => r.user_id === selectedUser.id);

    if (existingRole) {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: selectedRole })
        .eq('id', existingRole.id);

      if (error) {
        toast.error('Failed to update role');
        console.error(error);
      } else {
        toast.success('Role updated successfully');
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: selectedUser.id, role: selectedRole });

      if (error) {
        toast.error('Failed to assign role');
        console.error(error);
      } else {
        toast.success('Role assigned successfully');
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleRemoveRole = async (userId: string) => {
    if (userId === user?.id) {
      toast.error("You cannot remove your own role");
      return;
    }

    if (!confirm('Are you sure you want to remove this user\'s role?')) return;

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (error) {
      toast.error('Failed to remove role');
      console.error(error);
    } else {
      toast.success('Role removed successfully');
      fetchData();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-display">Users & Roles</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : profiles.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No users found.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {profiles.map((profile) => {
              const role = getUserRole(profile.id);
              const isCurrentUser = profile.id === user?.id;
              
              return (
                <Card key={profile.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {profile.full_name || profile.email}
                        {isCurrentUser && <span className="text-xs text-muted-foreground">(you)</span>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {profile.email} • Joined {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                      {role && (
                        <span className={`inline-flex items-center gap-1 mt-1 text-xs px-2 py-1 rounded ${
                          role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                        }`}>
                          <Shield className="h-3 w-3" />
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openAssignRoleDialog(profile)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        {role ? 'Change Role' : 'Assign Role'}
                      </Button>
                      {role && !isCurrentUser && (
                        <Button variant="outline" size="icon" onClick={() => handleRemoveRole(profile.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}

        {/* Assign Role Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Assign a role to <strong>{selectedUser?.email}</strong>
              </p>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={(value: 'admin' | 'editor') => setSelectedRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor - Can manage content</SelectItem>
                    <SelectItem value="admin">Admin - Full access including user management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAssignRole}>Assign Role</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create User Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Full Name</Label>
                <Input
                  id="new-name"
                  type="text"
                  placeholder="John Doe"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="user@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newRole} onValueChange={(value: 'admin' | 'editor') => setNewRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor - Can manage content</SelectItem>
                    <SelectItem value="admin">Admin - Full access including user management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;