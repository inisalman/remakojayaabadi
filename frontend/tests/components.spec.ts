import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import EmptyState from '../components/EmptyState.vue'
import EquipmentRow from '../components/EquipmentRow.vue'
import FeaturedProject from '../components/FeaturedProject.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ServiceCard from '../components/ServiceCard.vue'
import StatisticBlock from '../components/StatisticBlock.vue'

const project = {
  title: 'Rekonstruksi Jalan Tol Jagorawi',
  year: '2025',
  client: 'PT. Qinar Raya Mandiri',
  category: 'Jalan Tol',
  excerpt: '2025 — PT. Qinar Raya Mandiri',
  image: 'https://placehold.co/1200x675/4647AE/FFFFFF?text=Construction',
  alt: 'Proyek Rekonstruksi Jalan Tol Jagorawi',
}

const nuxtLink = { props: ['to'], template: '<a :href="to"><slot /></a>' }

it('renders zero-result message', () => {
  expect(mount(EmptyState).text()).toContain('Belum ada proyek di kategori ini')
})

it('renders compact project metadata and lazy image', () => {
  const wrapper = mount(ProjectCard, { props: { project }, global: { stubs: { NuxtLink: nuxtLink } } })
  expect(wrapper.text()).toContain('PT. Qinar Raya Mandiri')
  expect(wrapper.find('img').attributes('loading')).toBe('lazy')
})

it('renders featured project title and category', () => {
  const wrapper = mount(FeaturedProject, { props: { project }, global: { stubs: { NuxtLink: nuxtLink } } })
  expect(wrapper.text()).toContain('Rekonstruksi Jalan Tol Jagorawi')
  expect(wrapper.text()).toContain('Jalan Tol')
})

it('renders numbered service row', () => {
  const wrapper = mount(ServiceCard, {
    props: { number: '01', service: { title: 'Pembangunan Jalan', description: 'Konstruksi jalan baru.', icon: 'Construction' } },
    global: { stubs: { NuxtLink: nuxtLink } },
  })
  expect(wrapper.text()).toContain('01')
  expect(wrapper.text()).toContain('Pembangunan Jalan')
})

it('renders fleet quantity and unit label', () => {
  const wrapper = mount(EquipmentRow, { props: { item: { name: 'Excavator 200', quantity: '8 unit' } } })
  expect(wrapper.text()).toContain('8 unit')
})

it('renders statistic number and label', () => {
  expect(mount(StatisticBlock, { props: { number: '10+', label: 'Tahun Pengalaman' } }).text()).toContain('Tahun Pengalaman')
})
