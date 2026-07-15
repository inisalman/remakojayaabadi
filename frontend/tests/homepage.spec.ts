import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

vi.stubGlobal('useHead', vi.fn())
import IndexPage from '../pages/index.vue'

const stubs = {
  NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
  FeaturedProject: { props: ['project'], template: '<article data-test="featured-project">{{ project.title }}</article>' },
  ProjectCard: { props: ['project'], template: '<article data-test="project-card">{{ project.title }}</article>' },
  EquipmentRow: { props: ['item'], template: '<article>{{ item.name }}</article>' },
  ServiceCard: { props: ['number', 'service'], template: '<article>{{ number }} {{ service.title }}</article>' },
  StatisticBlock: { props: ['number', 'label'], template: '<div>{{ number }} {{ label }}</div>' },
  SectionHeading: { props: ['heading'], template: '<h2>{{ heading }}</h2>' },
  EmptyState: { template: '<p>Belum ada proyek di kategori ini</p>' },
}

it('renders editorial hero and four verified statistics', () => {
  const wrapper = mount(IndexPage, { global: { stubs } })
  expect(wrapper.find('h1').text()).toBe('Membangun standar baru untuk setiap proyek')
  expect(wrapper.text()).toContain('10+ Tahun Pengalaman')
  expect(wrapper.text()).toContain('12 Klien Mitra')
})

it('shows first project as featured in Semua category', () => {
  const wrapper = mount(IndexPage, { global: { stubs } })
  expect(wrapper.find('[data-test="featured-project"]').text()).toContain('Rekonstruksi Jalan Tol Jagorawi')
  expect(wrapper.findAll('[data-test="project-card"]')).toHaveLength(5)
})

it('shows exact empty state for Jembatan', async () => {
  const wrapper = mount(IndexPage, { global: { stubs } })
  await wrapper.get('button:nth-of-type(3)').trigger('click')
  expect(wrapper.text()).toContain('Belum ada proyek di kategori ini')
})
