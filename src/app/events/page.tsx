import { PageHeader } from '@/components/page-header';
import { events } from '@/lib/data';
import EventsCalendar from '@/components/events/events-calendar';

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Eventos Futuros"
        description="Fique por dentro da agenda de eventos e workshops da academia."
      />
      <EventsCalendar events={events} />
    </>
  );
}
