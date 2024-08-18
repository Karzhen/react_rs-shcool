# Forms project with using React + TypeScript + Vite

## Структура проекта

- forms/
- ├── node_modules/
- ├── public/
- ├── src/
- │   ├── assets/                    # Файлы с картинками, шрифты и другие статические ресурсы
- │   ├── components/                # Переиспользуемые компоненты
- │   │   ├── FormInput.tsx          # Общий компонент для полей ввода с валидацией
- │   │   ├── PasswordStrength.tsx   # Компонент для отображения силы пароля
- │   │   ├── CountryAutocomplete.tsx# Компонент автозаполнения для стран
- │   │   └── ...                    # Другие переиспользуемые компоненты
- │   ├── forms/                     # Формы
- │   │   ├── UncontrolledForm.tsx   # Форма с неконтролируемыми компонентами
- │   │   ├── HookForm.tsx           # Форма на базе React Hook Form
- │   │   └── validation/            # Валидационные схемы для форм
- │   │       ├── validationSchema.ts # Схема валидации для Yup
- │   ├── pages/                     # Страницы/маршруты
- │   │   ├── MainPage.tsx           # Главная страница с отображением данных
- │   │   ├── UncontrolledFormPage.tsx # Страница с формой на неконтролируемых компонентах
- │   │   ├── HookFormPage.tsx       # Страница с формой на React Hook Form
- │   ├── store/                     # Redux-хранилище
- │   │   ├── slices/                # Слайсы Redux Toolkit
- │   │   │   ├── formDataSlice.ts   # Слайс для хранения данных из форм
- │   │   │   └── countriesSlice.ts  # Слайс для хранения списка стран
- │   │   └── store.ts               # Настройка Redux Store
- │   ├── App.tsx                    # Корневой компонент приложения
- │   ├── main.tsx                   # Точка входа
- │   ├── routes.tsx                 # Файл с определением маршрутов
- │   ├── index.css                  # Стили общего назначения
- │   └── ...                        # Другие файлы и настройки (config, тесты и т.д.)
- ├── .eslintrc.json                 # Конфигурация ESLint
- ├── .prettierrc                    # Конфигурация Prettier
- ├── package.json                   # npm скрипты и зависимости
- └── vite.config.ts                 # Конфигурация Vite
