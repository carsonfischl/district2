export interface Newsletter {
  id: string
  title: string
  volume: string
  date: string
  description?: string
  pdfPath?: string
}

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
