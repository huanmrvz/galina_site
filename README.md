# Аведова Галина — сайт психолога

Современный одностраничный сайт психолога. Статический HTML/CSS/JS, без сборки.

## Локальный просмотр

Откройте `index.html` в браузере или поднимите простой сервер:

```bash
# Python
python -m http.server 5500

# Node
npx serve .
```

Затем откройте http://localhost:5500

## Структура

```
index.html      — разметка и контент
styles.css      — стили
script.js       — меню, анимации, параллакс
assets/         — изображения (замените на свои)
README.md       — эта инструкция
```

## Деплой на GitHub Pages

1. Создайте репозиторий на GitHub (например `galina_site`).
2. Запушьте код:

```bash
git add .
git commit -m "Add psychologist landing page"
git branch -M main
git remote add origin https://github.com/<USERNAME>/galina_site.git
git push -u origin main
```

3. В репозитории: **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main` / folder: `/ (root)` → Save.

Через несколько минут сайт будет доступен по адресу:

`https://<USERNAME>.github.io/galina_site/`

Если сайт лежит в подпапке (`/galina_site/`), а не на корневом домене пользователя, пути к CSS/JS/картинкам уже относительные — менять ничего не нужно.

## Свой домен

1. Купите домен (Reg.ru, Timeweb, Cloudflare и т.п.).
2. В корне репозитория создайте файл `CNAME` с одной строкой — вашим доменом:

```
galinaavedova.ru
```

3. У регистратора настройте DNS:

**Вариант A — поддомен `www`:**

| Тип   | Имя | Значение                         |
|-------|-----|----------------------------------|
| CNAME | www | `<USERNAME>.github.io`           |

**Вариант B — apex-домен (без www):**

| Тип | Имя | Значение        |
|-----|-----|-----------------|
| A   | @   | `185.199.108.153` |
| A   | @   | `185.199.109.153` |
| A   | @   | `185.199.110.153` |
| A   | @   | `185.199.111.153` |

4. В **Settings → Pages → Custom domain** укажите домен и дождитесь проверки DNS.
5. Включите **Enforce HTTPS**.

Подробнее: [документация GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Что заменить перед публикацией

- `assets/hero.jpg` и `assets/portrait.jpg` — на свои фото (сейчас стоят атмосферные placeholder-изображения).
- Ссылку на Telegram-канал в блоке контактов (`https://t.me/...`).
- Ссылку на профиль на портале психологов.
- При необходимости — номер WhatsApp (`wa.me/79270060038`).

## Запись на консультацию

Кнопки «Записаться» ведут в WhatsApp с готовым текстом сообщения.
