'use client';

import { useState } from 'react';
import type { Event } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function EventsCalendar({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const sortedEvents = events.sort((a, b) => a.date.getTime() - b.date.getTime());
  const futureEvents = sortedEvents.filter(event => event.date >= new Date());

  const eventDates = futureEvents.map(event => event.date);

  return (
    <div className="space-y-8">
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
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Agenda de Eventos</CardTitle>
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
                    <span className="text-2xl font-bold">
                      {format(event.date, 'd')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-xl text-foreground">
                      {event.title}
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      {format(event.date, "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                    <p className="mt-1">{event.description}</p>
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
  );
}
