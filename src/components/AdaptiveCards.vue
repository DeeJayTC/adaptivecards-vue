<template>
  <div />
</template>
<style scoped lang="scss">
@import '../scss/adaptive-card';
</style>

<script>
import * as AdaptiveCards from 'adaptivecards/dist/adaptivecards';
import { Template, EvaluationContext } from 'adaptivecards-templating/dist/adaptivecards-templating';
import HostConfig from '../assets/exampleHostConfig.json';
import axios from 'axios';

export default {
  name: 'AdaptiveCard',
  components: {
    AdaptiveCards,
    Template,
    EvaluationContext,
  },
  props: {
    card: {
        type: [ String, Object ],
        required: true,
        default: null
    },
    data: {
        type: [ String, Object ],
        required: false,
        default: null
    },
    hostConfig: {
        type: [ String, Object ],
        required: false,
        default: ''
    },
    useTemplating: {
        type: Boolean,
        required: true,
        default: true
    },
    cardUrl: {
        type: [ String, Object ],
        required: false,
        default: ''
    }
  },
  data() {
    return {
      cardHolder: null,
      cardRemoteTemplate: null
    }
  },
  computed: {
    cardParsed() {
      if(this.cardRemoteTemplate != null ) return this.cardRemoteTemplate;
      return this.card;
    },
    dataParsed() {
      return this.data;
    },
    hostConfigParsed() {
      if(this.hostConfig != '' && this.hostConfig != undefined) {
          return new AdaptiveCards.HostConfig(this.hostConfig);
      } else {
        return new AdaptiveCards.HostConfig(HostConfig)
      }
    }
  },
  watch: {
    data: {
      handler(n, o) {
        this.renderCard();
      },
      deep: true
    },
    card: {
      handler(n, o) {
        this.renderCard();
      },
      deep: true
    },
    hostConfig: {
      handler(n, o) {
        this.renderCard();
      },
      deep: true
    },
  },
  mounted() {
    this.renderCard();
  },
  methods:{
    renderCard(){
    const instance = axios.create({
      paramsSerializer(params) {
          return stringify(params, { arrayFormat: 'brackets' });
      },
    });

    // Load the card from url if passed
    if(this.cardUrl != ''){
        const json = axios.get(this.cardUrl).then( data => {
           if(data.status == 200){
             this.cardRemoteTemplate = JSON.stringify(data.data)
           }
        });
    }
    this.cardHolder = new AdaptiveCards.AdaptiveCard();
    this.cardHolder.hostConfig = this.hostConfigParsed;
 
    if(this.useTemplating && this.data == null){
        this.$el.remove();
        throw new Error("When using templating data is required");
    }

    if (this.useTemplating && this.data != null) {
      let template = new Template(this.cardParsed);
      let context = new EvaluationContext();
      context.$root = this.dataParsed;
      var cardToRender = template.expand(context);
      this.cardHolder.parse(cardToRender);
    } else {
      this.cardHolder.parse(cardToRender);
    }

    this.cardHolder.onExecuteAction = (action) => {
      this.$emit('onActionClicked', action, action.data);
    };

    this.cardElement = this.cardHolder.render();
    this.$el.innerHTML = '';
    this.$el.appendChild(this.cardElement);
    }
  }
};

</script>