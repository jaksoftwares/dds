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

export function UpdatesClient({ initialData }: { initialData: any[] }) {
  const [updates, setUpdates] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    type: "news",
    excerpt: "",
    content: "",
    image_url: "",
    author: "Dovepeak PR",
    is_published: true,
  });
  
  const router = useRouter();
  const supabase = createClient();

  const handleEdit = (article: any) => {
    setFormData(article);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    const { error } = await supabase.from("updates").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Article deleted.");
      setUpdates(updates.filter((s) => s.id !== id));
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData };
      if (payload.is_published && !payload.published_at) {
        payload.published_at = new Date().toISOString();
      }

      if (payload.id) {
        // Update
        const { error, data } = await supabase
          .from("updates")
          .update(payload)
          .eq("id", payload.id)
          .select();
        
        if (error) throw error;
        toast.success("Article updated!");
        setUpdates(updates.map((s) => (s.id === payload.id ? data[0] : s)));
      } else {
        // Insert
        const { error, data } = await supabase
          .from("updates")
          .insert([payload])
          .select();
          
        if (error) throw error;
        toast.success("Article created!");
        setUpdates([data[0], ...updates]);
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
      type: "news",
      excerpt: "",
      content: "",
      image_url: "",
      author: "Dovepeak PR",
      is_published: true,
    });
    setIsOpen(true);
  };

  return (
    <Card className="p-4 md:p-6 shadow-sm border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Articles</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew} className="bg-customBlueExtraDark text-white">
              <Plus className="w-4 h-4 mr-2" /> Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit Article" : "New Article"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Article Title</Label>
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
                  <Label>Type</Label>
                  <select 
                    required 
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={formData.type} 
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="news">News</option>
                    <option value="blog">Blog</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
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
                <Label>Excerpt</Label>
                <Textarea required className="h-20" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
              </div>
              
              <div className="space-y-2">
                <Label>Full HTML Content</Label>
                <Textarea className="h-32 font-mono text-xs" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t">
                <Switch 
                  checked={formData.is_published} 
                  onCheckedChange={(c) => setFormData({ ...formData, is_published: c })} 
                />
                <Label>Publish Immediately</Label>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4 bg-customBlueExtraDark">
                {loading ? "Saving..." : "Save Article"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Article</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                {article.image_url ? (
                  <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden">
                    <Image src={article.image_url} alt={article.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-400 border">No Img</div>
                )}
              </TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">{article.title}</div>
                <div className="text-xs text-slate-500 max-w-xs truncate">{article.author}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize text-xs">{article.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={article.is_published ? "default" : "secondary"}>
                  {article.is_published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                  <Pencil className="w-4 h-4 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {updates.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                No articles found. Add one above or run the seed script.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
