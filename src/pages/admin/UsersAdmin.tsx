import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Shield, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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

const UsersAdmin = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'editor'>('editor');

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
        <div>
          <h1 className="text-3xl font-display">Users & Roles</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
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
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
