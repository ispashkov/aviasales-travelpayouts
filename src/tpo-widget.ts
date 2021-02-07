import Pikaday from 'pikaday'
import { TpoWidgetOptions } from './types/tpoWidgetOptions'

export default class TpoWidget {
  private departurePicker: Pikaday | null = null
  private returnPicker: Pikaday | null = null

  private departureDate: Date | null = null
  private returnDate: Date | null = null

  private readonly element: HTMLElement | null = null

  private options: TpoWidgetOptions = {
    title: 'Where does it come from? Why do we use it?',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    backgroundColor: '#4a90e2',
    textColor: '#fff',
    departurePlaceholder: 'Departure date',
    returnPlaceholder: 'Return date',
    submitText: 'Search',
    submitBackgroundColor: '#F5A623',
    i18n: {
      previousMonth: 'Previous Month',
      nextMonth: 'Next Month',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
  }

  constructor(elementId: string, options?: Partial<TpoWidgetOptions>) {
    this.applyOptions(options)
    this.element = document.getElementById(elementId)
    this.render()
    this.didMount()
  }

  private applyOptions = (options?: Partial<TpoWidgetOptions>): void => {
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      }
    }
  }

  private getSize = (): string => {
    if (this.element) {
      const { offsetWidth } = this.element

      if (offsetWidth <= 286) return 'extraSmall'
      if (offsetWidth <= 440) return 'small'
      if (offsetWidth <= 768) return 'medium'
    }

    return 'large'
  }

  private getTemplate = (): string => {
    const {
      backgroundColor,
      textColor,
      title,
      description,
      departurePlaceholder,
      returnPlaceholder,
      submitText,
      submitBackgroundColor,
    } = this.options

    const size = this.getSize()

    return `<form class="tpo-widget tpo-widget--${size}" style="--tpo-widget-background-color: ${backgroundColor}; --tpo-widget-text-color: ${textColor}; --tpo-widget-submit-background-color: ${submitBackgroundColor}">
              <div class="tpo-widget__title">${title}</div>
              <div class="tpo-widget__description">${description}</div>
                
              <div class="tpo-widget-datepicker">
                <div class="tpo-widget-datepicker-box">
                  <input id="departureDate" class="tpo-widget-datepicker__input js-datepicker-departure" type="text" name="departureDate" placeholder="${departurePlaceholder}" />
                  <svg class="tpo-widget-datepicker__icon" width="15" height="17" viewBox="0 0 15 17" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7.99774C2 7.99774 2.0016 15.2489 2 15L13.0025 14.9989C13.0009 14.9989 12.9973 7.99945 12.9973 7.99945L2 7.99774ZM8 11H12V14H8V11ZM15 6V15C15 16.105 14.105 17 13 17H2C0.895 17 0 16.105 0 15V6H15ZM12 1.9995V1.00025C12 0.448112 11.552 0 11 0H10C9.448 0 9 0.448112 9 1.00025V1.9995H6V1.00025C6 0.448112 5.552 0 5 0H4C3.448 0 3 0.448112 3 1.00025V1.9995H2C0.895 1.9995 0 2.89472 0 4H15C15 2.89472 14.105 1.9995 13 1.9995H12Z"/>
                  </svg>
                </div>
                <div class="tpo-widget-datepicker-box">
                  <input id="returnDate" class="tpo-widget-datepicker__input js-datepicker-return" type="text" name="returnDate" placeholder="${returnPlaceholder}" />
                  <svg class="tpo-widget-datepicker__icon" width="15" height="17" viewBox="0 0 15 17" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7.99774C2 7.99774 2.0016 15.2489 2 15L13.0025 14.9989C13.0009 14.9989 12.9973 7.99945 12.9973 7.99945L2 7.99774ZM8 11H12V14H8V11ZM15 6V15C15 16.105 14.105 17 13 17H2C0.895 17 0 16.105 0 15V6H15ZM12 1.9995V1.00025C12 0.448112 11.552 0 11 0H10C9.448 0 9 0.448112 9 1.00025V1.9995H6V1.00025C6 0.448112 5.552 0 5 0H4C3.448 0 3 0.448112 3 1.00025V1.9995H2C0.895 1.9995 0 2.89472 0 4H15C15 2.89472 14.105 1.9995 13 1.9995H12Z"/>
                  </svg>
                </div>
              </div>
                    
              <button class="tpo-widget__submit" type="submit">${submitText}</button>
            </form>`
  }

  private render = (): void => {
    if (this.element) {
      this.element.innerHTML = this.getTemplate()
    }
  }

  private didMount = (): void => {
    if (this.element) {
      const { i18n } = this.options
      const options: Pikaday.PikadayOptions = {
        format: 'DD.MM.YYYY',
        minDate: new Date(),
        firstDay: 1,
        i18n,
      }

      const inputDeparture = this.element.querySelector<HTMLElement>(
        '.js-datepicker-departure',
      )
      const inputReturn = this.element.querySelector<HTMLElement>(
        '.js-datepicker-return',
      )

      if (inputDeparture && inputReturn) {
        this.departurePicker = new Pikaday({
          ...options,
          field: inputDeparture,
          onSelect: (date: Date) => {
            this.departureDate = date
            this.departureDateUpdate()
          },
        })

        this.returnPicker = new Pikaday({
          ...options,
          field: inputReturn,
          onSelect: (date: Date) => {
            this.returnDate = date
            this.returnDateUpdate()
          },
        })
      }
    }
  }

  private departureDateUpdate = (): void => {
    if (this.departurePicker && this.returnPicker) {
      this.departurePicker.setStartRange(this.departureDate)
      this.returnPicker.setStartRange(this.departureDate)
      this.returnPicker.setMinDate(this.departureDate)
    }
  }

  private returnDateUpdate = (): void => {
    if (this.departurePicker && this.returnPicker) {
      this.departurePicker.setEndRange(this.returnDate)
      this.departurePicker.setMaxDate(this.returnDate)
      this.returnPicker.setEndRange(this.returnDate)
    }
  }
}
