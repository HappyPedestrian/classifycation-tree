/*
 * @Description: 
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-29 13:54:11
 * @LastEditTime: 2022-04-04 20:14:15
 * @LastEditors: Happy_Pedestrian
 */
export function createMutationObserver(el: HTMLElement, callback: MutationCallback, opts?: any): MutationObserver {
  console.log('创建了observer', el)
  const mutationObserver = new MutationObserver(callback)
  mutationObserver.observe(el, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    ...opts
  })
  return mutationObserver
}