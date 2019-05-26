# MoneyBunney

### Trumpas aprašymas

Biudžeto planavimo sistema "**MoneyBunney**" - tai sistema, kuri leis vartotojams susikurti savo asmeninį mėnesio biudžetą. Tai padės žmogui, norinčiam taupyti, kontroliuoti savo išlaidas ir greičiau pasiekti teigiamus rezultatus. Programėlės vartotojas galės sekti savo pajamas, išlaidas, lyginti skirtingų laikotarpių statistiką, užsibrėžti biudžeto tikslus ar net matyti jų progresą,- ir viskas vienoje vietoje. Programėlė „MoneyBunney“ bus prieinama visiems nemokamai, todėl neprireiks rūpintis papildomomis išlaidomis. „MoneyBunney“ užtikrins, kad vartotojas būtų įspėjamas apie artėjančius įvykius: mokesčiai, tikslo siekimas, sumos limito spartus kritimas. Intuityvi ir paprasta vartotojo sąsaja, sužaidybinta ir motyvuojanti internetinė programėlė užtikrins patogią, greitą ir informatyvią finansų sekimo patirtį.

## Įdiegimo instrukcijos

Prieš leidžiant **MoneyBunney** reikia įsidiegti:

- [NodeJS](https://nodejs.org/en/)
- [Git Bash](https://git-scm.com/downloads/)
- [Mongo DB](https://www.mongodb.com/download-center/community)

## Sistemos įdiegimas:

```bash
cp .env.example .env
cd frontend && npm install
cd ../backend && npm install
```

## Sistemos paleidimas

Išorinė dalis:
`cd frontend && npm start`

Vidinė dalis (įsitikinus, kad mongo serveris paleistas):
`cd backend && npm run start`

## Papildoma informacija

Komandos narių rolės/pareigos:

- Milašauskaitė Roberta IFF - 7/7, roberta.milasauskaite@ktu.edu, komandos vadovė ir testuotoja.
- Stankevičius Martynas IFF - 7/8, mar.stankevicius@ktu.edu, komandos įkūrėjas ir programuotojas.
- Bankauskas Andrius IFF - 7/12, andrius.bankauskas@ktu.edu, projekto savininkas ir programuotojas.
- Grabauskas Mantas IFF - 7/1 m.grabauskas@ktu.edu, programuotojas.
- Klaidas Bespalovas IFF - 7/7 klaidas.bespalovas@ktu.edu, programuotojas.
