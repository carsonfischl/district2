export interface Attachment {
  label: string
  pdfPath: string
}

export interface Newsletter {
  id: string
  title: string
  volume?: string
  date: string
  description?: string
  pdfPath?: string
  attachments?: Attachment[]
}

export const otherDocs: Newsletter[] = [
  {
    id: 'other',
    title: 'Other',
    date: '',
    description: 'Other District 2 documents.',
    attachments: [
      { label: 'Flower Show Schedule', pdfPath: '/newsletters/Schedule LARGE final 8.5 x 11 (2).pdf' },
      { label: 'Photo Competition', pdfPath: '/newsletters/D2 2027 Photo Competition.pdf' },
    ],
  },
]

export const newsletters: Newsletter[] = [
  {
    id: 'spring-2026-vol13-no1',
    title: 'Spring 2026',
    volume: 'Vol. 13, No. 1',
    date: 'Spring 2026',
    description: 'Welcome to the Spring 2026 edition of the OHA District 2 newsletter.',
    pdfPath: '/newsletters/District 2 Newsletter - Spring 2026, Vol 13, No 1.pdf',
  },
]
