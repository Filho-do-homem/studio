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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

// Helper to format Date to 'YYYY-MM-DDTHH:mm' string for the input
const formatDateTimeForInput = (date: Date): string => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);

  // States for adding a new event
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState(emptyEvent);

  // States for editing an event
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // States for deleting an event
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleNewEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingEvent) return;
    const { id, value } = e.target;
    setEditingEvent((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleEditEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingEvent) return;
    const { value } = e.target;
    setEditingEvent((prev) => (prev ? { ...prev, date: new Date(value) } : null));
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
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (event: Event) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;

    // Ensure date is a Date object
    const finalEvent = {
      ...editingEvent,
      date: new Date(editingEvent.date),
    };

    setEventsList((prev) => prev.map((e) => (e.id === finalEvent.id ? finalEvent : e)));
    setIsEditDialogOpen(false);
    setEditingEvent(null);
  };

  const handleOpenDeleteDialog = (eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!eventToDelete) return;
    setEventsList((prev) => prev.filter((e) => e.id !== eventToDelete));
    setIsDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  return (
    <>
      <PageHeader
        title="Eventos Futuros"
        description="Fique por dentro da agenda de eventos e workshops da academia."
      >
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={handleNewEventInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data e Hora
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={handleNewEventInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={handleNewEventInputChange}
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

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>
              Atualize as informações do evento. Clique em salvar para aplicar as mudanças.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={editingEvent.title}
                  onChange={handleEditEventInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data e Hora
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formatDateTimeForInput(editingEvent.date)}
                  onChange={handleEditEventDateChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={handleEditEventInputChange}
                  rows={4}
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleUpdateEvent}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá apagar permanentemente o evento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EventsCalendar events={eventsList} onEditEvent={handleOpenEditDialog} onDeleteEvent={handleOpenDeleteDialog} />
    </>
  );
}
