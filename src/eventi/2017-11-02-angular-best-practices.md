---
title: 'Angular Best Practices'
subtitle: Fabio Biondi e Michele Stieven - 02.11.2017 @ Graffiti HUB
image: img/contents/2017-novembre.jpg
date: 2017-11-02 16:00:00
permalink: '/eventi/{{ page.date | dateslug }}/{{ page.fileSlug | slug }}/index.html'

published: true

event:
  speaker: Fabio Biondi e Michele Stieven
  location: Graffiti HUB

  eventbrite: 38620438772
  youtube:
  facebooklive: https://www.facebook.com/matteoguidotto/videos/10215039818932797/
  foto: https://www.facebook.com/media/set/?set=oa.1636754683056366&type=3
  slides:

cover: img/contents/2017-novembre-hero.jpg
---

Angular fornisce gli strumenti necessari per la creazione di un’intera Single Page Application.
Tuttavia, la quantità degli strumenti che il framework mette a disposizione degli sviluppatori non garantisce
altrettanta qualità nel loro utilizzo.
Dopo mesi di sviluppo, il risultato è spesso un miscuglio di codice in cui business logic, data layer e componenti
visuali si mescolano al punto tale da rendere l’applicazione ingestibile e difficile da mantenere.
Ogni nuova feature richiesta dal Cliente diventa un incubo, soprattutto nel medio-lungo periodo.

Pattern architetturali come Redux hanno recentemente stravolto positivamente l’intero panorama front-end
introducendo un nuovo approccio alla gestione dello stato applicativo.
Tuttavia, molti sviluppatori Angular li ritengono troppo complessi o onerosi in termini di configurazione,
affidandosi esclusivamente al solido sistema di Dependency Injection integrato nel framework.
Questa pratica, seppur efficace e semplice da utilizzare, porta spesso ad una serie di problematiche:
si tende ad iniettare i servizi in buona parte dei componenti creando uno stretto accoppiamento; i componenti
spesso contengono parte della business logic; lo stato applicativo non è protetto dall’immutabilità garantita
da pattern come Redux; il codice della UI non risulta testabile e potremmo continuare.

## IL PROGRAMMA

Durante la prima metà del pomeriggio, Fabio Biondi effettuerà il refactoring di un’applicazione Angular riorganizzando
la UI in componenti e sfruttando il motore di dependency injection per una corretta separazione delle responsabilità:
azioni, stato applicativo, helpers, utilities.

Inoltre, una corretta organizzazione dei moduli e l’utilizzo di un approccio totalmente stateless nella creazione della
UI garantiranno inoltre un’elevata scalabilità: sarà infatti molto semplice implementare funzionalità come il lazy
loading, integrare pattern architetturali come Redux o MobX State Tree, introdurre unit test o funzionalità come il
time travel debug.

Manutenzione e aggiornamento delle vostre applicazioni diventeranno operazioni semplici e indolore.

Il pomeriggio si conclude con Michele Stieven che ci descriverà i processi necessari per la creazione di applicazioni
multi-view, performanti e modulari.
Si parlerà di angular router, protezione delle rotte, lazy-loading e gestione moduli, applicando pattern e best practice
ormai consolidate per la realizzazione di applicazioni enterprise scalabili e semplici da mantenere.

## QUANDO

Giovedì 2 novembre 2017 dalle 16:00 alle 20:00

## DOVE

Graffiti HUB – Via Legnago 126, 37121 Verona
