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

Сайт уже на GitHub Pages:

https://huanmrvz.github.io/galina_site/

Пошаговая подготовка и DNS-записи — в [DOMAIN.md](DOMAIN.md).

Кратко:
1. Купите домен
2. Пропишите DNS (A → GitHub IP, `www` → `huanmrvz.github.io`)
3. Добавьте файл `CNAME` и укажите домен в **Settings → Pages**
4. Включите **Enforce HTTPS**

## Что заменить перед публикацией

- `assets/hero.jpg` — при желании заменить на своё атмосферное фото.
- При смене домена обновить абсолютные URL в Open Graph-метатегах (`og:url`, `og:image`).

## Запись на консультацию

Кнопки «Записаться» ведут в WhatsApp с готовым текстом сообщения.
