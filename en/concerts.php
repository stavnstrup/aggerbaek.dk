<?php $page_title = "Concerts" ?>
<?php include("../includes/_header.en.php"); ?>

  <header>
    <div class="row">
      <div class="twelve columns">
        <img id="logo" src="..//images/aggerbaek-logo.png" alt=""/>
      </div>
    </div>

    <div class="row">
      <div class="twelve columns">
        <div class="contain-to-grid">
          <nav class="top-bar" id="menubar">
            <ul>
              <li class="name"><h1 class="newlogo"><a href="index.php"><span class="newlogo">AGGERBÆK</span></a></h1></li>
              <li class="toggle-topbar"><a href="#"></a></li>
            </ul>
            <section>
              <ul class="left">
                <li><a href="discography.php" title="">discography</a></li>
                <li><a href="biography.php" title="">biography</a></li>
                <li class="active"><a href="concerts.php" title="">concerts</a></li>
                <li><a href="media.php" title="">media</a></li>
                <li><a href="press.php" title="">press</a></li>
                <li><a href="contact.php" title="">contact</a></li>
              </ul>
              <ul class="right">
                <li><a href="../index.php" title="Danish version"><img
                class="flag" src="../images/dk.png"/></a></li>
              </ul>
            </section>
          </nav>
        </div>
      </div>
    </div>

    <?php include("../includes/_banner.php"); ?>
  </header>

  <div class="row">
    <div class="twelve columns">

    <h5><?php echo "$page_title"; ?> 2014</h5>

<?php include("../includes/_concerts.php"); ?>

    </div>
  </div>


<?php include("../includes/_footer.php"); ?>

</body>
</html>
