<script setup lang="ts">
import { useMainStore } from '../store'
import type { TableColumnType, TableProps } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import {  ref } from 'vue'


type TableDataType = {
  exp: any
  blessing: any
  die: any
  gjl: any
  lsxl: any
  jbxl: any
  jyxl: any
  maxAtk: any
  maxMagic: any
  dps: any
  username: string
  lv: number
  coin: number
  gold: number
  isWF: string
}
// type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
defineProps<{ msg: string }>()
//store
const mainStore = useMainStore()
mainStore.getInfoInit().then((res: any) => {
  data.value = mainStore.data
})

const data = ref([])
const onChange: TableProps<TableDataType>['onChange'] = (
  pagination: any,
  filters: any,
  sorter: any
) => {
  console.log('params', pagination, filters, sorter)
}

const columns: TableColumnType<TableDataType>[] = [
  {
    title: '序号',
    customRender: ({ index }) => index + 1,
    fixed: 'left',
    width: 50,
  },
  {
    title: 'ID',
    dataIndex: 'username',
    key: 'username',
    sorter: (a: TableDataType, b: TableDataType) =>
      a.username.length - b.username.length,
    sortDirections: ['descend'],
    fixed: 'left',
    width: 130,
  },
  {
    title: '等级',
    dataIndex: 'lv',
    key: 'lv',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: TableDataType, b: TableDataType) => {
      if (a.lv == b.lv) return a.exp - b.exp
      return a.lv - b.lv
    },
    width: 100,
  },
  {
    title: '灵石(万)',
    dataIndex: 'coin',
    key: 'coin',
    sorter: (a: TableDataType, b: TableDataType) => a.coin - b.coin,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '金币(万)',
    dataIndex: 'gold',
    key: 'gold',
    sorter: (a: TableDataType, b: TableDataType) => a.gold - b.gold,
    sortDirections: ['descend', 'ascend'],
    width: 120,
  },
  {
    title: '物法',
    dataIndex: 'isWF',
    key: 'isWF',
    filters: [
      { text: '物', value: '物' },
      { text: '法', value: '法' },
    ],
    onFilter: (value: string | any, record: TableDataType) =>
      record.isWF.indexOf(value) === 0,
    align: 'center',
    width: 60,
  },
  {
    title: 'DPS',
    dataIndex: 'dps',
    key: 'dps',
    sorter: (a: TableDataType, b: TableDataType) => b.dps - a.dps,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '攻击力',
    dataIndex: 'gjl',
    key: 'gjl',
    sorter: (a: TableDataType, b: TableDataType) => b.gjl - a.gjl,
  },
  {
    title: '经验效率',
    dataIndex: 'jyxl',
    customRender: ({ record }) => (record.jyxl / 10000).toFixed(1),
    key: 'jyxl',
    sorter: (a: TableDataType, b: TableDataType) => b.jyxl - a.jyxl,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '金币效率',
    dataIndex: 'jbxl',
    customRender: ({ record }) => (record.jbxl / 10000).toFixed(1),
    key: 'jbxl',
    sorter: (a: TableDataType, b: TableDataType) => b.jbxl - a.jbxl,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '灵石效率',
    dataIndex: 'lsxl',
    key: 'lsxl',
    sorter: (a: TableDataType, b: TableDataType) => b.lsxl - a.lsxl,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '祝福',
    dataIndex: 'blessing',
    key: 'blessing',
    sorter: (a: TableDataType, b: TableDataType) => b.blessing - a.blessing,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '死亡',
    dataIndex: 'die',
    key: 'die',
    sorter: (a: TableDataType, b: TableDataType) => b.die - a.die,
    sortDirections: ['descend', 'ascend'],
  },
]
</script>

<template>
  <div>
    <h1>
      {{ msg }}
    </h1>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="mainStore.spinning"
      :row-class-name="(_record:any, index:number) => (index % 2 === 1 ? 'table-striped' : null)"
      @change="onChange"
      :scroll="{ scrollToFirstRowOnChange: true, x: 'auto', y: 'auto' }"
      bordered
      sticky
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'username'">
          <span>
            <smile-outlined />
            ID
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'username'">
          <a>
            {{ record.username }}
          </a>
        </template>
        <template v-if="column.key === 'lv'">
          <span>
            {{
              record.lv +
              ` (${((record.exp / record.lvUpExp) * 100).toFixed(1)}%)`
            }}
          </span>
        </template>
        <template v-if="column.key === 'coin'">
          <span>
            {{ (record.coin / 10000).toFixed(2) }}
          </span>
        </template>
        <template v-if="column.key === 'gold'">
          <span>
            {{ (record.gold / 10000).toFixed(2) }}
          </span>
        </template>
      </template>
    </a-table>
<!--    <template v-if="mainStore.spinning">-->
<!--      <a-spin size="large" />-->
<!--    </template>-->
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  color: rgb(141 140 140);
  font-weight: bold;
  font-weight: 800;
  font-family: cursive;
}
.read-the-docs {
  color: #888;
}
.ant-table-container {
  display: flex;
  flex-direction: column;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
