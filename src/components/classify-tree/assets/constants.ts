/*
 * @Description: 
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-29 13:54:11
 * @LastEditTime: 2022-04-13 15:22:30
 * @LastEditors: Happy_Pedestrian
 */
export function createMutationObserver(el: HTMLElement, callback: MutationCallback, opts?: any): MutationObserver {
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