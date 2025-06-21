'use server';

import { generateArtistBio } from '@/ai/flows/generate-artist-bio';
import { z } from 'zod';

const BioSchema = z.object({
  artworkDescription: z.string().min(10, { message: 'A descrição precisa ter pelo menos 10 caracteres.' }),
});

interface BioState {
  bio?: string;
  error?: string;
}

export async function handleGenerateBio(
  prevState: BioState,
  formData: FormData,
): Promise<BioState> {
  const validatedFields = BioSchema.safeParse({
    artworkDescription: formData.get('artworkDescription'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.artworkDescription?.join(', '),
    };
  }
  
  try {
    const result = await generateArtistBio({
      artworkDescription: validatedFields.data.artworkDescription,
    });
    if (result.bio) {
      return { bio: result.bio };
    }
    return { error: 'Não foi possível gerar a biografia.' };
  } catch (e) {
    console.error(e);
    return { error: 'Ocorreu um erro ao gerar a biografia. Tente novamente.' };
  }
}
