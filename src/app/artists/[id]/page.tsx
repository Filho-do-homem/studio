
'use client';

import { artists } from '@/lib/data';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Pencil } from 'lucide-react';
import AiBioGenerator from '@/components/artists/ai-bio-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState, type ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Artist } from '@/lib/types';

export async function generateStaticParams() {
  return artists.map((artist) => ({
    id: artist.id,
  }));
}

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const initialArtist = artists.find((a) => a.id === params.id);

  const [artist, setArtist] = useState<Artist | undefined>(initialArtist);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Artist | undefined>(initialArtist);

  if (!artist || !formData) {
    return <div className="py-10 text-center">Artista não encontrado.</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : undefined));
  };

  const handleDisciplinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => (prev ? { ...prev, disciplines: value.split(',').map((d) => d.trim()) } : undefined));
  };

  const handleSaveChanges = () => {
    console.log('Saving artist data:', formData);
    setArtist(formData);
    setIsDialogOpen(false);
  };

  const openEditDialog = () => {
    setFormData(artist);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <PageHeader title={artist.name}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={openEditDialog}>
              <Pencil />
              Editar Artista
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Atualize as informações do artista. Clique em salvar para aplicar as mudanças.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disciplines" className="text-right">
                  Disciplinas
                </Label>
                <Input
                  id="disciplines"
                  placeholder="Separe por vírgulas"
                  value={formData.disciplines.join(', ')}
                  onChange={handleDisciplinesChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" value={formData.bio} onChange={handleInputChange} rows={5} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={artist.profilePictureUrl}
                  alt={artist.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  data-ai-hint="artist portrait"
                />
              </div>
              <h2 className="font-headline text-2xl text-foreground">{artist.name}</h2>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {artist.disciplines.map((d) => (
                  <Badge key={d} variant="secondary">
                    {d}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{artist.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{artist.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="bio" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bio">Biografia</TabsTrigger>
              <TabsTrigger value="artworks">Obras de Arte</TabsTrigger>
            </TabsList>
            <TabsContent value="bio" className="mt-6 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Biografia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{artist.bio}</p>
                </CardContent>
              </Card>
              <AiBioGenerator />
            </TabsContent>
            <TabsContent value="artworks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Obras de Arte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {artist.artworks.map((artwork) => (
                      <div key={artwork.id} className="group overflow-hidden rounded-lg border">
                        <div className="overflow-hidden">
                          <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            width={600}
                            height={400}
                            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={artwork['data-ai-hint']}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-headline text-lg text-foreground">
                            {artwork.title} ({artwork.year})
                          </h3>
                          <p className="text-sm text-muted-foreground">{artwork.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
