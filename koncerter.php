<?php $page_title = "Koncerter" ?>
<?php include("includes/_header.php"); ?>

  <header>
    <div class="row">
      <div class="twelve columns">
        <img id="logo" src="/images/aggerbaek-logo.png" alt=""/>
      </div>
    </div>

    <div class="row">
      <div class="twelve columns">
        <div class="contain-to-grid">
          <nav class="top-bar" id="menubar">
            <ul>
              <li class="name"><h1 class="newlogo"><a href="/index.php"><span class="newlogo">AGGERBÆK</span></a></h1></li>
              <li class="toggle-topbar"><a href="#"></a></li>
            </ul>
            <section>
              <ul class="left">
                <li><a href="diskografi.php" title="">diskografi</a></li>
                <li><a href="biografi.php" title="">biografi</a></li>
                <li class="active"><a href="koncerter.php" title="">koncerter</a></li>
                <li><a href="medie.php" title="">medie</a></li>
                <li><a href="presse.php" title="">presse</a></li>
                <li><a href="kontakt.php" title="">kontakt</a></li>
              </ul>
              <ul class="right">
                <li><a href="en/index.php" title="Engelsk version"><img
                class="flag" src="images/gb.png"/></a></li>
              </ul>
            </section>
          </nav>
        </div>
      </div>
    </div>

    <?php include("includes/_banner.php"); ?>
  </header>

  <div class="row">
    <div class="twelve columns">

    <h5><?php echo "$page_title"; ?> 2014</h5>

<?php include("includes/_concerts.php"); ?>

    </div>
  </div>


<?php include("includes/_footer.php"); ?>

</body>
</html>

