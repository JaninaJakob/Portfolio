<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body class="detail-page">

    <!-- Logo Janina -->
    <a href="/pages/contact.php" class="corner-logo">
        <img src="/covers/Logo_def_weiss.png" alt="Foto von Janina">
    </a>

    <!-- Navigation -->
    <div class="ende-navigation">
        <?php include __DIR__ . '/php/navigation.php'; ?>
    </div>

    <!-- HERO-Bereich fuer das Projekt -->
    <section class="hero-section" id="heroSection">
  <div class="hero-sticky">
    <div class="hero-frame" id="heroFrame">

      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
        alt=""
      >

      <div class="hero-text">
        <div class="hero-title">The Exit Interview</div>
        <div class="hero-subtitle">
          A short film about
          silence, endings
          and transition
        </div>
      </div>

    </div>
  </div>
</section>

</body>

    <?php include __DIR__ . '/../php/footer.php'; ?>
    
</html>