<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head has-background-warning">
        <p class="modal-card-title">{{ selectedPokemon }}</p>
        <button type="button" class="delete" @click="closeCard()" />
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <img
              :src="this.$store.state.image"
              alt="Pokemon sprite"
              display="block"
              width="35%"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="box">
              <h2 class="is-size-4"><b>Abilities</b></h2>
              <ul v-if="abilities.length>0">
                <li
                  v-for="option in abilities"
                  :value="option.id"
                  :key="option.id"
                  class="mt-1"
                >
                  <b-tag type="is-primary" class="ml-3 is-size-6 is-capitalized" size="is-medium">{{ option }}</b-tag>
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <h1 class="is-size-4"><b>Stats</b></h1>
              <ul>
                <li
                  v-for="option in stats"
                  :value="option.id"
                  :key="option.id"
                  class="mt-1"
                >
                  <b-taglist attached >
                    <b-tag type="is-dark" class=" is-size-6 is-capitalized" size="is-medium">{{
                      option.statName
                    }}</b-tag>
                    <b-tag type="is-info" class=" is-size-6 is-capitalized" size="is-medium">{{
                      option.base_stat
                    }}</b-tag>
                  </b-taglist>
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <h1 class="is-size-4"><b>Types</b></h1>
              <ul v-if="types.length>0">
                <li
                  v-for="option in types"
                  :value="option.id"
                  :key="option.id"
                  class="mt-1"
                >
                  <b-tag type="is-danger" class="ml-3 is-size-6 is-capitalized" size="is-medium">{{
                    option.typeName
                  }}</b-tag>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="columns"  v-if="evolution.length>1">
           <div class="column">
              <div class="box">
                <h1 class="is-size-4"><b>Evolution</b></h1>
                <ul>
                  <li>
                    <b-tag v-for="option in evolution"
                    :value="option.id"
                    :key="option.id"
                    class="ml-3 is-size-5 is-capitalized" type="is-light" size="is-medium">{{ option.species_name }}</b-tag>
                  </li>
                </ul>
              </div>  
           </div>  
        </div>  
      </section>
      <footer class="modal-card-foot has-background-warning">
        <b-button type="is-dark" label="Close" @click="closeCard()"/>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "../../../node_modules/axios";
export default {
  name: "Card",

  data: function () {
    return {
      name: this.$store.state.pokemonName,
      abilities: this.$store.state.abilities,
      stats: this.$store.state.stats,
      types: this.$store.state.types,
      evolution:[{}],
    };
  },
  created() {
    for (let i = 1; i <= 200; i++) {
      axios
        .get("https://pokeapi.co/api/v2/evolution-chain/" + i + "/")
        .then((res) => {

          let pname = this.$store.state.pokemonName;
          if (res.data.chain.species.name.trim() === pname && res.data.chain.evolves_to.length>0) {
            let evoChain = [];
            let evoData = res.data.chain;

            do {
              let numberOfEvolutions = evoData.evolves_to.length;

              evoChain.push({
                species_name: evoData.species.name,
                
              });

              if (numberOfEvolutions > 1) {
                for (let i = 1; i < numberOfEvolutions; i++) {
                  evoChain.push({
                    species_name: evoData.evolves_to[i].species.name,
                   
                  });
                }
              }

              evoData = evoData.evolves_to[0];
            } while (
              evoData != undefined &&
              evoData.hasOwnProperty("evolves_to")
            );
            this.evolution = evoChain
          }
          
        })
        .catch((error) => console.log(error));
    }
  },
  computed: {
    selectedPokemon() {
      return this.$store.state.pokemonName.toUpperCase();
    },
  },
  methods: {
    closeCard() {
      this.$router.push("/pokemon");
    },
    
  },
};
</script>
<style>
.modal-card-body {
  background-color: #080808 !important;
}

.modal-content,
.modal-card {
  width: 900px !important;
}
</style>