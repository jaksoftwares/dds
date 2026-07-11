"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ServicesClient({ initialData }: { initialData: any[] }) {
  const [services, setServices] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    short_description: "",
    content: "",
    icon_name: "Globe",
    is_active: true,
  });
  
  const router = useRouter();
  const supabase = createClient();

  const handleEdit = (service: any) => {
    setFormData(service);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Service deleted.");
      setServices(services.filter((s) => s.id !== id));
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        // Update
        const { error, data } = await supabase
          .from("services")
          .update(formData)
          .eq("id", formData.id)
          .select();
        
        if (error) throw error;
        toast.success("Service updated!");
        setServices(services.map((s) => (s.id === formData.id ? data[0] : s)));
      } else {
        // Insert
        const { error, data } = await supabase
          .from("services")
          .insert([formData])
          .select();
          
        if (error) throw error;
        toast.success("Service created!");
        setServices([data[0], ...services]);
      }
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setFormData({
      title: "",
      slug: "",
      short_description: "",
      content: "",
      icon_name: "Globe",
      is_active: true,
    });
    setIsOpen(true);
  };

  return (
    <Card className="p-4 md:p-6 shadow-sm border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">All Services</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="bg-customBlueExtraDark text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit Service" : "New Service"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    required 
                    value={formData.title} 
                    onChange={(e) => {
                      const title = e.target.value;
                      // Auto-generate slug if it's a new post
                      const slug = formData.id ? formData.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setFormData({ ...formData, title, slug });
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input required value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} />
              </div>
              
              <div className="space-y-2">
                <Label>Full Content</Label>
                <Textarea required className="h-32" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lucide Icon Name</Label>
                  <Input value={formData.icon_name} onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })} />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch 
                    checked={formData.is_active} 
                    onCheckedChange={(c) => setFormData({ ...formData, is_active: c })} 
                  />
                  <Label>Active & Visible</Label>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4 bg-customBlueExtraDark">
                {loading ? "Saving..." : "Save Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="font-medium text-slate-900">{service.title}</div>
                <div className="text-xs text-slate-500 max-w-sm truncate">{service.short_description}</div>
              </TableCell>
              <TableCell className="text-slate-600 font-mono text-xs">{service.icon_name}</TableCell>
              <TableCell>
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Active" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                  <Pencil className="w-4 h-4 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {services.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                No services found. Add one above or run the seed script.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
