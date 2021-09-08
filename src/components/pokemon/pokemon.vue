<template>
  <div ref="element">
    <section class="section is-fluid">
      <div class="container is-fluid">
        <div class="content is-fluid">
          <h2 class="title has-text-centered is-2">Pokemon list</h2>
          <b-table
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :pagination-rounded="isPaginationRounded"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="user.first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :selected.sync="selected"
            :sticky-header="stickyHeaders"
          >
            <b-table-column field="print" label="" >
              <template #default >
                <b-tooltip
                  class="icon has-text-black has-tooltip-arrow"                  
                >
                  <b-button type="is-white" v-on:click="openFiche">
                    <b-icon icon="file-export" size="is-medium"> </b-icon>
                  </b-button>
                  <template v-slot:content>Click to access card</template>
                </b-tooltip>
              </template>
            </b-table-column>
            <template v-for="column in columns">
              <b-table-column :key="column.id" v-bind="column">
                <template v-if="column.searchable" #searchable="props">
                  <b-input
                    v-model="props.filters[props.column.field]"
                    placeholder="Filtrer..."
                    type="search"
                    icon="magnify"
                    size="is-small"
                  />
                </template>
                <template v-slot="props" >
                  {{ props.row[column.field] }}
                </template>
              </b-table-column>
            </template>
            <b-table-column
              field="stats"
              label="HP"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-dark">{{ props.row.stats[0].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="stats"
              label="Attack"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-danger">{{ props.row.stats[1].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="stats"
              label="Defense"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-info">{{ props.row.stats[2].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="stats"
              label="Special Attack"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-danger is-light">{{ props.row.stats[3].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="stats"
              label="Special Defense"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-success is-light">{{ props.row.stats[4].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="stats"
              label="Speed"
              headerClass="is-header"
              v-slot="props"
            >
              <b-taglist>
                <b-tag  type="is-warning">{{ props.row.stats[5].base_stat }}</b-tag>
              </b-taglist>
            </b-table-column>
            <b-table-column
              field="image"
              label="#"
              headerClass="is-header"
              v-slot="props"
            >
              <img
                :src="props.row.image"
                alt="Pokemon sprite"
                display="block"
                width="8%"
              />
            </b-table-column>
            
          </b-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios";

let data = [{}];
let pokemon = [{}];

let PokemonImage = "";
export default {
  name: "Pokemon",
  props: {
    msg: String,
  },
  components: {
  },
  props: {

  },
  data: function () {
    return {
      data,
      isLoading: false,
      isFullPage: true,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 10,
      isBordered: false,
      selected: data[1],
      isStriped: false,
      isNarrowed: true,
      keepFirst: false,
      openOnFocus: false,
      locale: undefined,
      mylocal: null,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",

      columns: [
        {
          field: "id",
          label: "ID",
          searchable: true,
          centered: true,
          numeric: true,
          headerClass: "is-header",
        },
        {
          field: "name",
          label: "Name",
          searchable: true,
          centered: true,
          numeric: false,
          headerClass: "is-header",
          cellClass : "is-capitalized",
        },
      ],
      stickyHeaders: false,
    };
  },
  created() {
    const loadingComponent = this.$buefy.loading.open({
      container: this.isFullPage ? null : this.$refs.element.$el,
    });
    setTimeout(() => loadingComponent.close(), 1000);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200")
      .then((response) => {
        const mydata = response.data.results;
        const tempPokemon = [];

        for (let key in mydata) {
          let pokUrl = mydata[key].url.slice(33);
          let pokId = pokUrl.slice(1, pokUrl.length - 1);
          let mypok = {};
          mypok.id = pokId;
          mypok.name = mydata[key].name;
          mypok.abilities = {};
          mypok.stats = {};
          mypok.image = {};
          mypok.types = {};
          tempPokemon.push(mypok);
        }

        for (let key in tempPokemon) {
          let name = tempPokemon[key].name;
          let pokemonAbilities = [];
          let pokemonTypes = [];
          let pokemonStats = [];

          let pokemon = tempPokemon[key];
          axios
            .get("https://pokeapi.co/api/v2/pokemon/" + name + "/")
            .then((res) => {
              for (let key in res.data) {
                if (res.data["name"] === name && key === "abilities") {
                  
                  for (let key in res.data["abilities"]) {
                    pokemonAbilities.push(
                      res.data["abilities"][key].ability.name
                    );
                  }

                  pokemon.abilities = pokemonAbilities;
                } else if (res.data["name"] === name && key === "sprites") {
                  pokemon.image =
                    res.data["sprites"].other.dream_world.front_default;
                } else if (res.data["name"] === name && key === "stats") {
                  for (let key in res.data["stats"]) {
                    let pokemonStat = {
                      base_stat: res.data["stats"][key].base_stat,
                      statName: res.data["stats"][key].stat.name,
                    };

                    pokemonStats.push(pokemonStat);
                  }

                  pokemon.stats = pokemonStats;
                } else if (res.data["name"] === name && key === "types") {
                  for (let key in res.data["types"]) {
                    let pokemonType = {
                      typeName: res.data["types"][key].type.name,
                    };

                    pokemonTypes.push(pokemonType);
                  }

                  pokemon.types = pokemonTypes;
                }
              }
            })
            .catch((error) => console.log(error));
          tempPokemon[key] = pokemon;
        }
        
        this.data = tempPokemon;
        this.selected = this.data[2];
      })
      .catch((error) => console.log(error));
  },
  
  methods: {
    
    openFiche() {
      this.$store.state.abilities = this.selected.abilities;
      this.$store.state.stats = this.selected.stats;
      this.$store.state.types = this.selected.types;
      this.$store.state.pokemonName = this.selected.name;
      this.$store.state.image = this.selected.image;

      this.$router.push("/card");
    },
  },
};
</script>

<style scoped>
a.button {
  border-color: white !important;
}
</style>
