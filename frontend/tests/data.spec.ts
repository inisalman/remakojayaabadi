import { expect, it } from 'vitest'
import projects from '../data/projects.json'
import services from '../data/services.json'
import equipment from '../data/equipment.json'
import legalities from '../data/legalities.json'
import clients from '../data/clients.json'
import team from '../data/team.json'
import testimonials from '../data/testimonials.json'

it('contains approved homepage data', () => {
  expect([projects.length, services.length, equipment.length, legalities.length, clients.length, team.length]).toEqual([6, 4, 6, 5, 12, 5])
  expect(testimonials).toEqual([])
  expect(projects.filter((item) => item.category === 'Jalan Tol')).toHaveLength(5)
  expect(projects.filter((item) => item.category === 'Jembatan')).toHaveLength(0)
})
