<script setup lang="ts">

const { pid } = $defineProps<{
  pid: string
}>()


const { getGameState } = $(aoEffectStore())

onMounted(async () => {
  const rz = await getGameState(pid)
  console.log(`====> rz :`, rz)
})
const Board_Size = 40;

const board = ref(Array(Board_Size * Board_Size).fill(''));

const players = {
  'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA1': {
    x: 19,
    y: 20,
    health: 77,
    energy: 99,
  },
  'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA2': {
    x: 20,
    y: 20,
    health: 77,
    energy: 99,
  },
  'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA3': {
    x: 20,
    y: 20,
    health: 100,
    energy: 68,
  },
  'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA': {
    x: 20,
    y: 20,
    health: 100,
    energy: 0,
  },
  'pzYP3kdThp0IrAWY9-SI7I1f-LtbJC_gHG_y-8xfvA': {
    x: 20,
    y: 20,
    health: 100,
    energy: 0,
  },
}

const indexMap = $computed(() => {
  const theMap = {}
  Object.keys(players).map(pid => {
    const { x, y } = players[pid]
    const index = (y - 1) * Board_Size + x - 1
    if (!theMap[index]) {
      theMap[index] = []
    }
    theMap[index].push(pid)
  })
  return theMap
})

const hasPlayer = index => {
  if (indexMap[index] && indexMap[index].length > 0) {
    return true
  }
  return false
}
</script>
<template>
  <div class="chess-board">
    <div v-for="(chess, index) in board" :key="index" class="bg-green-400 chess-grid">
      <div class="chess-cell">
        <UPopover v-if="hasPlayer(index)" mode="hover">
          <template v-if="indexMap[index].length > 1">
            <UChip :text="indexMap[index].length" inset size="2xl" color="red">
              <DicebearAvatar :seed="indexMap[index][0]" class="rounded-full h-8 w-8" size="3xl" />
            </UChip>
          </template>
          <template v-else>
            <DicebearAvatar v-for="pid in indexMap[index]" :key="`${index}-${pid}`" :seed="pid" class="rounded-full h-8 w-8" size="3xl" />
          </template>
          <template #panel>
            <div class="flex space-x-5 p-4 justify-center items-center">
              <ULandingCard class="w-80" v-for="pid in indexMap[index]" :title="pid" :key="`${index}-${pid}-detail`" description="Choose a primary and a gray color from your Tailwind CSS color palette. Components will be styled accordingly." color="primary">
                <template #icon>
                  <div class="flex justify-center">
                    <DicebearAvatar :seed="pid" class="h-20 w-20" size="3xl" />
                  </div>
                </template>
                <template #description>
                  <div class="space-y-5 my-10">
                    <UMeter :value="players[pid].energy" size="sm" color="cyan">
                      <template #indicator="{ percent }">
                        <div class="text-sm text-right">
                          Energy: {{ percent }}
                        </div>
                      </template>
                    </UMeter>
                    <UMeter :value="players[pid].health" size="sm" color="green">
                      <template #indicator="{ percent }">
                        <div class="text-sm text-right">
                          Health: {{ percent }}
                        </div>
                      </template>
                    </UMeter>
                  </div>
                </template>
              </ULandingCard>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </div>
</template>

<style lang="less">
// credit https: //juejin.cn/post/7343484473184895013?searchId=20240317184254EC834A77FA080C30B454
.chess-board {
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-gap: 1px;
  background-color: #d18b47;
  padding: 8px;
  width: fit-content;
  margin: 0 auto;

  .chess-grid {
    width: 40px;
    height: 40px;
    // background-color: #f9d16b;
    display: flex;
    justify-content: center;
    align-items: center;

    //
    display: flex;
    justify-content: center;
    align-items: center;

    .chess-cell {
      width: 32px;
      height: 32px;
      // border-radius: 50%;
      // background-color: black;
    }
  }
}
</style>