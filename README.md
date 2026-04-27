# WEBB25 ALM: Gruppuppgift

## Beskrivning

Detta är en gruppuppgift för kursen Applikationslivscykelhantering på Nackademin.

**Gruppstorlek:** 2 - 4 personer
**Datum:** 2026-05-25
**Tid:** 09:00 - 17:00

## Instruktioner

Gruppen ska forka detta repository och sätta upp projektet med nödvändiga verktyg och teknologier.

### Teknologier

- Git – för versionshantering
- GitHub – för versionshantering och Actions
- Docker – för containerisering

### Kod

- Express – för API:et
- MongoDB – för databasen
- Mongoose – för databas ORM
- Vitest – för testning av modeller

### Uppgifter

Alla i gruppen måste bidra till koden. Detta görs genom att ha ett enda repo med flera bidragsgivare och skapa pull requests för varje ny funktion.

**Obligatoriska uppgifter**

- [ ] **Testerna körs automatiskt med GitHub Actions vid push och PR mot main**
- [ ] **Koden containeriseras med en Dockerfile**
- [ ] **Accommodation-modellen ska ha adress, stad, land, postnummer, hyra, rum och en referens till userId (behöver tester)**
- [ ] **User-modellen ska tvinga unik e-post och unikt användarnamn (behöver tester)**
- [ ] **User-modellen ska ha ett profilbildsfält som är en URL till en bild (behöver tester)**
- [ ] **Accommodation-modellen ska raderas när användaren raderas (behöver tester)**

### Individuella uppgifter för VG

Om du inte är repo-ägaren, forka repot till ditt eget GitHub-konto och gör följande. Om du är repo-ägare, fortsätt direkt med uppgifterna nedan.

- [ ] **Skapa en `docker-compose.yml` som startar både applikationen och MongoDB**
- [ ] **Verifiera att applikationen fungerar via Docker Compose lokalt**

Exempel på struktur för `docker/docker-compose.yml`:

```yaml
services:
  db:
    image: mongo:latest
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  app:
    build:
      context: .
      dockerfile: docker/dockerfile
    environment:
      - MONGODB_URI=mongodb://admin:password@db:27017/webb25_alm?authSource=admin
      - PORT=3000
    ports:
      - "3000:3000"
    depends_on:
      - db

volumes:
  mongo_data:
```

Starta applikationen:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Stäng ner applikationen:

```bash
docker compose -f docker/docker-compose.yml down
```
