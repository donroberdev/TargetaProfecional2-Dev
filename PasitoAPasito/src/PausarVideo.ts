import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Pausar Video',
  schema: {
    videoEntity: ecs.eid, // referencia a la entidad del plano con video
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('initial-state')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const {videoEntity} = schemaAttribute.get(eid) // <- así se lee, no schemaAttribute.videoEntity

        if (!videoEntity) return

        ecs.VideoControls.mutate(world, videoEntity, (cursor) => {
          cursor.paused = true // o !cursor.paused para alternar
          return false
        })
      })
  },
})