import { artists } from '@/lib/data';
import ArtistCard from '@/components/artists/artist-card';
import { PageHeader } from '@/components/page-header';

export default function Home() {
  return (
    <>
      <PageHeader
        title="Artistas"
        description="Conheça os artistas da Academia Frutalense de Artes."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}
