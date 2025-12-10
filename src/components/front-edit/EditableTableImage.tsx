import { useState, ReactNode } from 'react';
import { Pencil, Check, X, Upload } from 'lucide-react';
import { useFrontEdit } from '@/contexts/FrontEditContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EditableTableImageProps {
  children: ReactNode;
  tableName: 'projects' | 'news' | 'services' | 'about_content' | 'gallery';
  recordId: string;
  currentUrl: string | null;
  onUpdate?: () => void;
  className?: string;
}

export const EditableTableImage = ({
  children,
  tableName,
  recordId,
  currentUrl,
  onUpdate,
  className = '',
}: EditableTableImageProps) => {
  const { isEditMode } = useFrontEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentUrl || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${tableName}-${recordId}-${Date.now()}.${fileExt}`;
      const filePath = `front-edit/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ image_url: imageUrl })
        .eq('id', recordId);

      if (error) throw error;

      toast.success('Image updated successfully');
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update image');
    } finally {
      setSaving(false);
    }
  };

  if (!isEditMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {children}
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all duration-200 flex items-center justify-center rounded">
          <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <Pencil className="w-5 h-5" />
          </div>
        </div>
        <span className="absolute inset-0 border-2 border-dashed border-primary/40 rounded pointer-events-none group-hover:border-primary transition-all duration-200" />
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {imageUrl && (
              <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="flex-1"
              />
              <Button variant="outline" className="relative" disabled={uploading}>
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploading}
                />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Check className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
