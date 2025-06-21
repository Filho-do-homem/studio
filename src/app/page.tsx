'use client';

import { useState } from 'react';
import { artists } from '@/lib/data';
import type { Artist } from '@/lib/types';
import ArtistCard from '@/components/artists/artist-card';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
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
import { PlusCircle } from 'lucide-react';

const emptyArtist: Omit<Artist, 'id' | 'artworks' | 'profilePictureUrl'> = {
  name: '',
  email: '',
  phone: '',
  disciplines: [],
  bio: '',
};

export default function Home() {
  const [artistList, setArtistList] = useState<Artist[]>(artists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newArtist, setNewArtist] = useState(emptyArtist);
  const [disciplinesInput, setDisciplinesInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewArtist((prev) => ({ ...prev, [id]: value }));
  };

  const handleDisciplinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisciplinesInput(e.target.value);
  };

  const handleAddArtist = () => {
    if (!newArtist.name || !newArtist.email) {
      // Simple validation
      alert('Nome e Email são obrigatórios.');
      return;
    }
    const newArtistData: Artist = {
      ...newArtist,
      id: Math.random().toString(36).substring(7),
      profilePictureUrl: 'https://placehold.co/400x400.png',
      artworks: [],
      disciplines: disciplinesInput.split(',').map((d) => d.trim()).filter(d => d),
    };
    setArtistList((prev) => [newArtistData, ...prev]);
    setNewArtist(emptyArtist);
    setDisciplinesInput('');
    setIsDialogOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Artistas"
        description="Conheça os artistas da Academia Frutalense de Artes."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Adicionar Artista
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Artista</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo integrante da academia.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" value={newArtist.name} onChange={handleInputChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" value={newArtist.email} onChange={handleInputChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input id="phone" value={newArtist.phone} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disciplines" className="text-right">
                  Disciplinas
                </Label>
                <Input
                  id="disciplines"
                  placeholder="Separe por vírgulas"
                  value={disciplinesInput}
                  onChange={handleDisciplinesChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" value={newArtist.bio} onChange={handleInputChange} rows={5} />
              </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleAddArtist}>
                Salvar Artista
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artistList.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}
