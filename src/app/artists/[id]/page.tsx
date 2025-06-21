import { artists } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react';
import AiBioGenerator from '@/components/artists/ai-bio-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function generateStaticParams() {
  return artists.map((artist) => ({
    id: artist.id,
  }));
}

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const artist = artists.find((a) => a.id === params.id);

  if (!artist) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader title={artist.name} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={artist.profilePictureUrl}
                  alt={artist.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  data-ai-hint="artist portrait"
                />
              </div>
              <h2 className="font-headline text-2xl text-foreground">{artist.name}</h2>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {artist.disciplines.map((d) => (
                  <Badge key={d} variant="secondary">{d}</Badge>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{artist.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{artist.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="artworks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bio">Biografia</TabsTrigger>
              <TabsTrigger value="artworks">Obras de Arte</TabsTrigger>
            </TabsList>
            <TabsContent value="bio" className="mt-6 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Biografia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{artist.bio}</p>
                </CardContent>
              </Card>
              <AiBioGenerator />
            </TabsContent>
            <TabsContent value="artworks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Obras de Arte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {artist.artworks.map((artwork) => (
                      <div key={artwork.id} className="group overflow-hidden rounded-lg border">
                        <div className="overflow-hidden">
                          <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            width={600}
                            height={400}
                            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={artwork['data-ai-hint']}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-headline text-lg text-foreground">{artwork.title} ({artwork.year})</h3>
                          <p className="text-sm text-muted-foreground">{artwork.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
