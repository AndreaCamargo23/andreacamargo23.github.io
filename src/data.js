import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Amortización',
      href: getPermalink('/amortizacion'),
    },
    {
      text: 'Capitalizacion',
      href: getPermalink('/capitalizacion'),
    },
    {
      text: 'Conversion de Tasas',
      href: getPermalink('/conversiones'),
    },
  ],
  actions: [
  ],
};
  
export const footerData = {
  links: [
    {
      title: 'Autores',
      links: [
        { text: 'Milena Camargo - 20232678020', href: '#' },
        { text: 'Harold Muñoz - 20232678022', href: '#' },
      ],
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
