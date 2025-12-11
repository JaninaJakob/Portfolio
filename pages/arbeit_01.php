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

    </div>
  </section>

  <!-- Normaler Content darunter -->
  <main class="detail-content">
    <p>
      Hier dein weiterer Inhalt (Beschreibung, Trackliste etc.).
    </p>
  </main>

</body>
</html>







