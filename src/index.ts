import TpoWidget, { TpoWidgetOptions } from './tpo-widget'
import './styles.css'

export default {
  init: (elementId: string, options?: Partial<TpoWidgetOptions>): TpoWidget => {
    return new TpoWidget(elementId, options)
  },

  destroy: (elementId: string): void => {
    const element = document.getElementById(elementId)

    if (element) {
      element.innerHTML = ''
    }
  },
}
