import { PageHeader } from '@/components/page-header';
import { minutes } from '@/lib/data';
import MinutesDisplay from '@/components/minutes/minutes-display';

export default function MinutesPage() {
  return (
    <>
      <PageHeader
        title="Atas de Reunião"
        description="Acesse os registros das reuniões semanais da academia."
      />
      <MinutesDisplay initialMinutes={minutes} />
    </>
  );
}
