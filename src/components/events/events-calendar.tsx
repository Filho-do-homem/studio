'use client';

import { useState } from 'react';
import type { Event } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventsCalendarProps {
  events: Event[];
  onEditEvent: (event: Event) => void;
}

export default function EventsCalendar({ events, onEditEvent }: EventsCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  const futureEvents = sortedEvents.filter((event) => event.date >= new Date());

  const eventDates = futureEvents.map((event) => event.date);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="flex justify-center p-0 sm:p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                locale={ptBR}
                modifiers={{
                  events: eventDates,
                }}
                modifiersStyles={{
                  events: {
                    color: 'hsl(var(--primary-foreground))',
                    backgroundColor: 'hsl(var(--primary))',
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              {futureEvents.length > 0 ? (
                <ul className="space-y-6">
                  {futureEvents.map((event) => (
                    <li key={event.id} className="flex items-start gap-4">
                      <div className="flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-md bg-primary p-3 text-primary-foreground">
                        <span className="text-sm font-light uppercase">
                          {format(event.date, 'MMM', { locale: ptBR }).replace('.', '')}
                        </span>
                        <span className="text-2xl font-bold">{format(event.date, 'd')}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-headline text-xl text-foreground">{event.title}</h3>
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              {format(event.date, "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                                locale: ptBR,
                              })}
                            </p>
                            <p className="mt-1">{event.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-4 flex-shrink-0"
                            onClick={() => onEditEvent(event)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar Evento</span>
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Nenhum evento futuro agendado.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
