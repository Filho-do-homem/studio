// src/ai/flows/generate-artist-bio.ts
'use server';

/**
 * @fileOverview Generates an artist biography based on uploaded artworks.
 *
 * - generateArtistBio - A function that generates the artist bio.
 * - GenerateArtistBioInput - The input type for the generateArtistBio function.
 * - GenerateArtistBioOutput - The return type for the generateArtistBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArtistBioInputSchema = z.object({
  artworkDescription: z
    .string()
    .describe("A comprehensive description of the artist's artwork and style."),
});
export type GenerateArtistBioInput = z.infer<typeof GenerateArtistBioInputSchema>;

const GenerateArtistBioOutputSchema = z.object({
  bio: z.string().describe('A biography for the artist.'),
});
export type GenerateArtistBioOutput = z.infer<typeof GenerateArtistBioOutputSchema>;

export async function generateArtistBio(input: GenerateArtistBioInput): Promise<GenerateArtistBioOutput> {
  return generateArtistBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArtistBioPrompt',
  input: {schema: GenerateArtistBioInputSchema},
  output: {schema: GenerateArtistBioOutputSchema},
  prompt: `You are an art curator who is writing artist biographies for an art gallery.

  Based on the following description of the artist's artwork and style, write a short and engaging biography for the artist.

  Artwork Description: {{{artworkDescription}}}
  `,
});

const generateArtistBioFlow = ai.defineFlow(
  {
    name: 'generateArtistBioFlow',
    inputSchema: GenerateArtistBioInputSchema,
    outputSchema: GenerateArtistBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
