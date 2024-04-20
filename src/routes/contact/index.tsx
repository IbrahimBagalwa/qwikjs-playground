import { Resource, component$, useResource$ } from '@builder.io/qwik'

import { CONTACTS, Contact } from './fake-contact-db'
import styles from './contat.module.css'
export default component$(() => {
  const contactsResponse = useResource$<Contact[]>(async () => {
    return await Promise.resolve(CONTACTS)
  })
  return (
    <div>
      <h1>Contact</h1>
      <Resource
        value={contactsResponse}
        onPending={() => <div>Loading...</div>}
        onResolved={(contact) => {
          return (
            <section class={styles.container}>
              {contact.map((contact) => (
                <div key={contact.id} class={styles.content}>
                  <img
                    width='200'
                    height='200'
                    src={contact.avatar}
                    alt={contact.name}
                    class={styles.avatar}
                  />
                  <div>
                    <p class={styles.name}>{contact.name}</p>
                    <p class={styles.role}>{contact.role}</p>
                    <div class={styles.link}>
                      <a href={contact.twitter}>twitter</a>
                      <span> | </span>
                      <a href={contact.linkedin}>linkedin</a>
                      <span> | </span>
                      <a href={contact.github}>github</a>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )
        }}
      />
    </div>
  )
})
