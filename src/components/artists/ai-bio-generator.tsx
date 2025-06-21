'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { handleGenerateBio } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Gerando...' : 'Gerar Biografia'}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function AiBioGenerator() {
  const [state, formAction] = useFormState(handleGenerateBio, {
    bio: '',
    error: '',
  });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [showBio, setShowBio] = useState(false);
  const { pending } = useFormStatus();


  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar biografia',
        description: state.error,
      });
    }
    if (state.bio) {
        setShowBio(true);
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Gerador de Biografia com IA
        </CardTitle>
        <CardDescription>
          Descreva as obras e o estilo do artista para gerar uma biografia
          sugestiva.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor="artworkDescription">Descrição das obras e estilo</Label>
            <Textarea
              id="artworkDescription"
              name="artworkDescription"
              placeholder="Ex: O artista usa cores vibrantes e formas geométricas para expressar emoções complexas, com influência do cubismo e do surrealismo."
              rows={4}
              required
            />
            {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
      {pending && (
         <CardContent className='space-y-2'>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
         </CardContent>
      )}
      {showBio && state.bio && !pending && (
        <CardContent>
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className='font-headline text-lg'>Biografia Sugerida</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-secondary-foreground'>{state.bio}</p>
                </CardContent>
            </Card>
        </CardContent>
      )}
    </Card>
  );
}
