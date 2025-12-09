<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/assets/styles.css">
  <title>Work Grid</title>

    
</head>

<body>

<?php include __DIR__ . '/../php/navigation.php'; ?>


<?php
$cat = $_GET['cat'] ?? '';
$category = strtolower($cat);

// Alle Projekte als Daten
$projects = [
    [
        'title'    => 'Dj Watson & BEATBUS der Musiklieferant',
        'category' => 'blender', 
        'image'    => '/covers/cd1.jpg',
        'alt'      => 'Projekt 1',
    ],
    [
        'title'    => 'Tide of Rescue',
        'category' => 'gamedesign',
        'image'    => '/covers/cd2.jpg',
        'alt'      => 'Projekt 2',
    ],
    [
        'title'    => 'Street Photography',
        'category' => 'fotografie',
        'image'    => '/covers/cd3.jpg',
        'alt'      => 'Projekt 3',
    ],
    [
        'title'    => 'Stillleben',
        'category' => 'blender',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 4',
    ],
    [
        'title'    => 'UI Konzept',
        'category' => 'uiux',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 5',
    ],
    [
        'title'    => 'Typo Poster',
        'category' => 'typografie',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 6',
    ],
    [
        'title'    => 'Portfolio Website',
        'category' => 'webdesign',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 7',
    ],
    [
        'title'    => 'Game UI',
        'category' => 'gamedesign',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 8',
    ],
    [
        'title'    => 'Stillleben 2',
        'category' => 'blender',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 9',
    ],
    [
        'title'    => 'Landingpage',
        'category' => 'webdesign',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 10',
    ],
    [
        'title'    => 'Foto Serie',
        'category' => 'fotografie',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 11',
    ],
    [
        'title'    => 'Type Layout',
        'category' => 'typografie',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 12',
    ],
    [
        'title'    => 'App UI',
        'category' => 'uiux',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 13',
    ],
    [
        'title'    => 'Web App',
        'category' => 'webdesign',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 14',
    ],
    [
        'title'    => 'Blender Scene',
        'category' => 'blender',
        'image'    => '/covers/cd4.jpg',
        'alt'      => 'Projekt 15',
    ],
];
?>
<main class="wrap">
  <ul class="work-grid">
    <?php foreach ($projects as $project): ?>
      <?php
        // Ist ein Filter aktiv UND passt die Kategorie nicht?
        $isDimmed = $category !== '' && $project['category'] !== $category;
      ?>
      <li
        data-category="<?php echo htmlspecialchars($project['category']); ?>"
        class="<?php echo $isDimmed ? 'is-dimmed' : ''; ?>"
      >
        <a class="card" href="#">
          <div class="thumb">
            <img src="<?php echo htmlspecialchars($project['image']); ?>"
                 alt="<?php echo htmlspecialchars($project['alt']); ?>"
                 loading="lazy">
          </div>
          <div class="meta">
            <span class="kicker"><?php echo htmlspecialchars($project['title']); ?></span><br>
            <span class="title">
              <?php
                echo $project['category'] === 'uiux'
                    ? 'UI/UX'
                    : ucfirst($project['category']);
              ?>
            </span>
          </div>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
</main>




  <?php include __DIR__ . '/../php/footer.php'; ?>

</body>
</html>
