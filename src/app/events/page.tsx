'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { events as initialEvents } from '@/lib/data';
import EventsCalendar from '@/components/events/events-calendar';
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
import type { Event } from '@/lib/types';

const emptyEvent = {
  title: '',
  date: '',
  description: '',
};

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState(emptyEvent);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.description) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const newEventData: Event = {
      id: Math.random().toString(36).substring(7),
      title: newEvent.title,
      date: new Date(newEvent.date),
      description: newEvent.description,
    };

    setEventsList((prev) => [...prev, newEventData]);
    setNewEvent(emptyEvent);
    setIsDialogOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Eventos Futuros"
        description="Fique por dentro da agenda de eventos e workshops da academia."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Adicionar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Evento</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo evento. Clique em salvar para adicionar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input id="title" value={newEvent.title} onChange={handleInputChange} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data e Hora
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleAddEvent}>
                Salvar Evento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <EventsCalendar events={eventsList} />
    </>
  );
}
