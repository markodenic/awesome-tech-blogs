import { shallowMount } from "@vue/test-utils";
import index from "@/pages/index";

describe("Homepage", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(index, {
      stubs: {
        Blog: true,
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test("should render all the blogs", () => {
    expect(wrapper.find('.blogs').exists()).toBe(true);
  })
})
