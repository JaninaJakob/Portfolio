<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dj Watson &amp; BEATBUS der Musiklieferant</title>
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/main.js" defer></script>
</head>
<body class="detail-page">

  <!-- Navigation NICHT im Hero -->
  <header class="detail-header">
    <div class="ende-navigation">
      <?php include __DIR__ . '/../php/navigation.php'; ?>
    </div>
  </header>

  <!-- Scroll-Hero -->
  <section class="hero-section" id="heroSection">
    <div class="hero-sticky">

      <!-- Nur das Bild wird skaliert/rotiert -->
      <div class="hero-frame" id="heroFrame">
        <img
          src="/covers/cd1.jpg"
          alt="CD-Cover Blender"
        >
      </div>

      <!-- Text liegt ueber dem Bild, aber ausserhalb des Frames -->
      <div class="hero-text">
        <div class="hero-title">Blender</div>
        <div class="hero-subtitle">
          Dj Watson &amp; BEATBUS der Musiklieferant
        </div>
      </div>

      <!-- Grosser Text nach dem Scrollen -->
      <div class="hero-bigtext" id="heroBigtext">BILDER</div>

    </div>
  </section>

  <!-- ================= POLAROID SWIPE / SCROLL GALERIE (ohne Button) ================= -->
  <section class="polaroid-gallery" id="polaroidGallery" aria-label="Polaroid Galerie">
  <div class="polaroid-label"><strong>Einzelarbeit</strong><br>In Zusammenarbeit mit Dj Watson</div>
  <br>
    <div class="polaroid-viewport" id="polaroidViewport">
      <div class="polaroid-track" id="polaroidTrack">

        <figure class="polaroid">
          <img src="/img/bild_01.jpg" alt="Live 1" loading="lazy">
          <figcaption>Live</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_02.jpg" alt="Detail 1" loading="lazy">
          <figcaption>Detail</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_03.jpg" alt="Crowd" loading="lazy">
          <figcaption>Crowd</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_04.jpg" alt="Beatbus" loading="lazy">
          <figcaption>Beatbus</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_05.jpg" alt="Beatbus" loading="lazy">
          <figcaption>Beatbus</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_06.jpg" alt="Beatbus" loading="lazy">
          <figcaption>Beatbus</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_07.jpg" alt="Beatbus" loading="lazy">
          <figcaption>Beatbus</figcaption>
        </figure>

        <figure class="polaroid">
          <img src="/img/bild_08.jpg" alt="Beatbus" loading="lazy">
          <figcaption>Beatbus</figcaption>
        </figure>

        <!-- Fuege hier einfach beliebig viele weitere <figure class="polaroid"> ... </figure> hinzu -->

      </div>
    </div>
    <div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lightbox-close" id="lightboxClose" aria-label="Schliessen">×</button>
  <img id="lightboxImg" alt="">
</div>

  </section>

  <!-- Normaler Content darunter -->
  <main class="detail-content">
    <p>
      Hier dein weiterer Inhalt (Beschreibung, Trackliste etc.).
    </p>
  </main>

  <audio id="polaroidClickSound" preload="auto">
  <source src="/mp4/sound_01.mp3" type="audio/mpeg">
  <source src="" type="audio/ogg">
</audio>

</body>
</html>






