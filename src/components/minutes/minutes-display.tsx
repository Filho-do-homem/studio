'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Minute } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';

export default function MinutesDisplay({ initialMinutes }: { initialMinutes: Minute[] }) {
  const [minutes, setMinutes] = useLocalStorage<Minute[]>('minutes', initialMinutes);
  const [newMinute, setNewMinute] = useState({ title: '', date: '', content: '' });

  const handleAddMinute = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMinute.title && newMinute.date && newMinute.content) {
      const newId = Math.random().toString(36).substring(7);
      setMinutes([{ id: newId, ...newMinute }, ...minutes]);
      setNewMinute({ title: '', date: '', content: '' });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Registros Anteriores</CardTitle>
          </CardHeader>
          <CardContent>
            {minutes.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {minutes.map((minute) => (
                  <AccordionItem key={minute.id} value={minute.id}>
                    <AccordionTrigger className="font-headline text-lg hover:no-underline">
                      <div>
                        {minute.title}
                        <p className="text-sm font-normal text-muted-foreground">
                          {format(new Date(minute.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground whitespace-pre-wrap">
                      {minute.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground">Nenhuma ata registrada.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Adicionar Nova Ata</CardTitle>
            <CardDescription>Registre uma nova ata de reunião.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMinute} className="space-y-4">
              <div>
                <Label htmlFor="minute-date">Data</Label>
                <Input
                  id="minute-date"
                  type="date"
                  value={newMinute.date}
                  onChange={(e) => setNewMinute({ ...newMinute, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="minute-title">Título</Label>
                <Input
                  id="minute-title"
                  type="text"
                  placeholder="Título da reunião"
                  value={newMinute.title}
                  onChange={(e) => setNewMinute({ ...newMinute, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="minute-content">Conteúdo</Label>
                <Textarea
                  id="minute-content"
                  placeholder="Digite o conteúdo da ata..."
                  rows={8}
                  value={newMinute.content}
                  onChange={(e) => setNewMinute({ ...newMinute, content: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Salvar Ata</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
