import { defineStore } from 'pinia'
import { getInfo } from '../api/request'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      data: [],
    }
  },
  getters: {},
  actions: {
    async getInfoInit() {
      const ret = await getInfo()
      const data: [any] = ret.data
      //展开数组对象
      const mainData: any = data.map(
        ({ lsxl, jbxl, jyxl, mins, die, fb, player }) => ({
          lsxl,
          jbxl,
          jyxl,
          mins,
          die,
          ...fb,
          ...player,
        })
      )
      const mapData: any = data.map((util) => ({ ...util }))
      const retData: any = mainData.map(
        (val: {
          username: any
          maxAtk: any
          maxMagic: any
          minAtk: any
          strCritsDamageRate: number
          strCritsRate: number
          minMagic: any
          intCritsDamageRate: number
          intCritsRate: number
        }) => ({
          ...val,
          isWF: val.maxAtk > val.maxMagic ? '物' : '法',
          dps:
            val.maxAtk > val.maxMagic
              ? Math.round(
                  ((val.maxAtk + val.minAtk) / 2) *
                    val.strCritsDamageRate *
                    val.strCritsRate
                )
              : Math.round(
                  ((val.maxMagic + val.minMagic) / 2) *
                    val.intCritsDamageRate *
                    val.intCritsRate
                ),
          gjl: val.maxAtk > val.maxMagic ? val.maxAtk : val.maxMagic,
        })
      )
      //console.log(retData)
      this.data = retData
      return this.data
    },
  },
})
