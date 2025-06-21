import Link from 'next/link';
import Image from 'next/image';
import type { Artist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <Image
              src={artist.profilePictureUrl}
              alt={artist.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="artist portrait"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl text-foreground group-hover:text-primary">
            {artist.name}
          </CardTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            {artist.disciplines.map((discipline) => (
              <Badge key={discipline} variant="secondary" className="bg-accent text-accent-foreground">
                {discipline}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
