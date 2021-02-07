import { PikadayI18nConfig } from 'pikaday'

export interface TpoWidgetOptions {
  title: string
  description: string
  backgroundColor: string
  textColor: string
  departurePlaceholder: string
  returnPlaceholder: string
  submitText: string
  submitBackgroundColor: string
  i18n: PikadayI18nConfig
}
