import { mount } from "@vue/test-utils";
import Blog from "@/components/Blog";

const markoBlog = {
  name: 'Marko ⚡ Denic',
  description: 'Web developer. IT consultant and trainer.',
  url: 'https://markodenic.com/blog/',
  twitter: '@denicmarko',
  tags: [
    'HTML',
    'CSS',
    'JavaScript',
    'Web Development',
    'Vue',
    'Nuxt',
    'Front End',
    'Laravel',
    'TailwindCSS',
    'SEO',
  ],
};

describe("Blog", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Blog, {
      propsData: {
        blog: markoBlog,
        activeTag: 'all'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test("should render the blog name", () => {
    expect(wrapper.text()).toContain(markoBlog.name);
  })

  test("should render all the tags added", () => {
    expect(wrapper.findAll('.tag').length).toBe(markoBlog.tags.length);
  })
})
