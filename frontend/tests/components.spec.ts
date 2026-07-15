import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import EmptyState from '../components/EmptyState.vue'
import ProjectCard from '../components/ProjectCard.vue'

it('renders zero-result message', () => {
  expect(mount(EmptyState).text()).toContain('Belum ada proyek di kategori ini')
})

it('renders project metadata and lazy image', () => {
  const wrapper = mount(ProjectCard, {
    props: {
      project: {
        title: 'Rekonstruksi Jalan Tol Jagorawi',
        year: '2025',
        client: 'PT. Qinar Raya Mandiri',
        category: 'Jalan Tol',
        excerpt: '2025 — PT. Qinar Raya Mandiri',
        image: 'https://placehold.co/1200x675/4647AE/FFFFFF?text=Construction',
        alt: 'Proyek Rekonstruksi Jalan Tol Jagorawi',
      },
    },
    global: {
      stubs: {
        NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
      },
    },
  })

  expect(wrapper.text()).toContain('Jalan Tol')
  expect(wrapper.text()).toContain('PT. Qinar Raya Mandiri')
  expect(wrapper.find('img').attributes('loading')).toBe('lazy')
})
