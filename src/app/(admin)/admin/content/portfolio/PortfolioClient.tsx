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
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";
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

export function PortfolioClient({ initialData }: { initialData: any[] }) {
  const [portfolio, setPortfolio] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    client_name: "",
    category: "",
    description: "",
    content: "",
    image_url: "",
    is_published: true,
  });
  
  const router = useRouter();
  const supabase = createClient();

  const handleEdit = (project: any) => {
    setFormData(project);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Project deleted.");
      setPortfolio(portfolio.filter((s) => s.id !== id));
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
          .from("portfolio")
          .update(formData)
          .eq("id", formData.id)
          .select();
        
        if (error) throw error;
        toast.success("Project updated!");
        setPortfolio(portfolio.map((s) => (s.id === formData.id ? data[0] : s)));
      } else {
        // Insert
        const { error, data } = await supabase
          .from("portfolio")
          .insert([formData])
          .select();
          
        if (error) throw error;
        toast.success("Project created!");
        setPortfolio([data[0], ...portfolio]);
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
      client_name: "",
      category: "",
      description: "",
      content: "",
      image_url: "",
      is_published: true,
    });
    setIsOpen(true);
  };

  return (
    <Card className="p-4 md:p-6 shadow-sm border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Projects</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="bg-customBlueExtraDark text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit Project" : "New Project"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input 
                    required 
                    value={formData.title} 
                    onChange={(e) => {
                      const title = e.target.value;
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input required value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <ImageUploader 
                  value={formData.image_url} 
                  onChange={(url) => setFormData({ ...formData, image_url: url })} 
                  onRemove={() => setFormData({ ...formData, image_url: "" })}
                />
              </div>

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea required className="h-20" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              
              <div className="space-y-2">
                <Label>Full Content / Case Study</Label>
                <Textarea className="h-32" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t">
                <Switch 
                  checked={formData.is_published} 
                  onCheckedChange={(c) => setFormData({ ...formData, is_published: c })} 
                />
                <Label>Published Live</Label>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4 bg-customBlueExtraDark">
                {loading ? "Saving..." : "Save Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolio.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                {project.image_url ? (
                  <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden">
                    <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-400 border">No Img</div>
                )}
              </TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">{project.title}</div>
                <div className="text-xs text-slate-500 max-w-xs truncate">{project.client_name}</div>
              </TableCell>
              <TableCell className="text-slate-600 text-sm">{project.category}</TableCell>
              <TableCell>
                <Badge variant={project.is_published ? "default" : "secondary"}>
                  {project.is_published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                  <Pencil className="w-4 h-4 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {portfolio.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                No projects found. Add one above or run the seed script.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
